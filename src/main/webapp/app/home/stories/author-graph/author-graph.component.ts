import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';

import * as THREE from 'three';
import { StoriesService } from '../stories.service';
import { GraphInfoDialogComponent } from './graph-info-dialog/graph-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Story } from '../story/story.model';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserProfile } from '../user-profile/user-profile.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { Router } from '@angular/router';

interface Node {
  id: number;
  name: string;
  image: string;
}

interface Author {
  name: string;
  image: string;
  coAuthors: string[];
}

interface Link {
  source: number;
  target: number;
  group: number;
}

@Component({
  selector: 'jhi-author-graph',
  templateUrl: './author-graph.component.html',
  styleUrls: ['./author-graph.component.scss'],
})
export class AuthorGraphComponent {
  @ViewChild('graphDiv') graphDiv!: ElementRef;
  public selectedNode: Node | undefined = undefined;
  private graph!: ForceGraph3DInstance;

  private nodeId = 0;
  private stories: Story[] = [];
  private account: Account | null = null;
  private userProfiles: UserProfile[] = [];
  private addedUsers: string[] = [];
  private authors: Author[] = [];

  // private nodes: Node[] = Array.from(Array(this.samples)).map((_, idx) => ({ id: idx, name:"" }));
  // private links: Link[] = this.nodes.filter(({id}) => id > 0).map(({id}) =>
  //  ({
  //	source: id,
  //	target: Math.round(Math.random() * this.samples),
  //	group: id % 2
  //  })
  // );

  private nodes: Node[] = [];
  private links: Link[] = [];

  private gData = {
    nodes: this.nodes,
    links: this.links,
  };

  constructor(
    private elementRef: ElementRef,
    private dialog: MatDialog,
    private router: Router,
    private storyService: StoriesService,
    private accountService: AccountService,
    private userProfileService: UserProfileService
  ) {
    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.storyService.findAll().subscribe((stories: Story[]) => {
        this.stories = stories;
        this.userProfileService.findAll().subscribe((userProfiles: UserProfile[]) => {
          this.userProfiles = userProfiles;
          this.createAuthors();
        });
      });
    });

    // console.log(this.gData);
  }

  public createAuthors(): void {
    this.stories.forEach((story: Story) => {
      if (this.authors.filter((author: Author) => story.author === author.name).length === 0) {
        const loggedUserProfile: UserProfile = this.userProfiles.filter((u: UserProfile) => u.username === story.author)[0];
        const newAuthor: Author = { name: story.author, image: loggedUserProfile.coverImage, coAuthors: [] };
        if (story.coAuthorsApproved) {
          story.coAuthorsApproved.split(';;').forEach((coAuthor: string) => {
            if (newAuthor.coAuthors.indexOf(coAuthor) === -1) {
              newAuthor.coAuthors.push(coAuthor);
            }
          });
        }
        this.authors.push(newAuthor);
      } else {
        const author = this.authors.filter((b: Author) => story.author === b.name)[0];
        if (story.coAuthorsApproved) {
          story.coAuthorsApproved.split(';;').forEach((coAuthor: string) => {
            if (author.coAuthors.indexOf(coAuthor) === -1) {
              author.coAuthors.push(coAuthor);
            }
          });
        }
      }
    });
    this.generateData(this.nodes, this.links, [], 0);
  }

  ready(): void {
    this.graph = ForceGraph3D()(this.htmlElement);
    this.graph.backgroundColor('white');
    this.graph.linkColor((group: any) => (group ? '#000' : '#222'));
    this.graph.nodeColor((group: any) => (group ? '#FF5738' : '#7fd8fe'));
    this.graph.nodeThreeObject(node => {
      const map = new THREE.TextureLoader().load((node as Node).image);
      map.minFilter = THREE.LinearFilter;
      const material = new THREE.SpriteMaterial({ map });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(32, 32, 1);
      return sprite;
    });
    this.graph.onNodeClick((node: any) => {
      // Aim at node from outside it

      if (this.selectedNode === node) {
        this.router.navigate(['/'], { state: { coAuthorsFilter: node.name } });
      }
      this.selectedNode = node;

      const distance = 100;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      const newPos =
        node.x || node.y || node.z ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio } : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)
      console.warn(node);

      this.graph.cameraPosition(
        newPos, // new position
        node, // lookAt ({ x, y, z })
        1000 // ms transition duration
      );
      //this.graph.zoomToFit(1000, 10, (aNode) => aNode === node);
    });
    this.graph.linkWidth((group: any) => (group ? 2 : 10));
    this.graph.d3Force('link')?.distance((group: any) => 70);
    this.graph.graphData(this.gData);
    this.windowResize();
  }

  @HostListener('window:resize')
  public windowResize(): void {
    const box = this.htmlElement.getBoundingClientRect();
    this.graph.width(box.width);
    this.graph.height(box.height - 125);
    // this.graph.controls().handleResize();
  }

  public openInfo(): void {
    this.dialog.open(GraphInfoDialogComponent, {
      data: {
        title: "You've reached a limit for additional media",
        body: 'Please add only 10 additional media files',
        okButton: 'Ok',
      },
      restoreFocus: false,
      height: '225px',
      width: '450px',
      panelClass: ['mat-dialog-override'],
    });
  }

  private get htmlElement(): HTMLElement {
    return this.graphDiv.nativeElement as HTMLElement;
  }

  private generateData(nodes: Node[], links: Link[], data: string[], linkTo: number): void {
    this.authors.forEach(author => {
      this.nodeId++;
      nodes.push({ id: this.nodeId, image: author.image, name: author.name });
    });
    console.warn(this.nodes);
    this.authors.forEach(author => {
      const authorNode: Node = this.nodes.filter(node => node.name === author.name)[0];

      author.coAuthors.forEach(coAuthor => {
        console.warn(coAuthor);
        if (this.nodes.filter(node => node.name === coAuthor).length === 1) {
          const coAuthorNode: Node = this.nodes.filter(node => node.name === coAuthor)[0];
          this.links.push({ source: authorNode.id, target: coAuthorNode.id, group: 1 });
        }
      });
    });
    console.warn(this.links);
    this.ready();
  }
}
