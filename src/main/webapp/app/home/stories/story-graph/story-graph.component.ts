import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';

import * as THREE from 'three';
import { StoriesService } from '../stories.service';
import { Story } from '../story/story.model';
import { GraphInfoDialogComponent } from '../author-graph/graph-info-dialog/graph-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface Node {
  id: number;
  name: string;
  collapsed: boolean;
  image?: string;
  tags?: string[];
}

interface GraphStory {
  name: string;
  tags: string[];
  image: string;
}

interface Link {
  source: number;
  target: number;
  group: number;
}

@Component({
  selector: 'jhi-story-graph',
  templateUrl: './story-graph.component.html',
  styleUrls: ['./story-graph.component.scss'],
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('graphDiv') graphDiv!: ElementRef;

  private graph!: ForceGraph3DInstance;

  private rootId = 20;
  private nodeId = 21;
  private stories: GraphStory[] = [];

  private tags = [
    'Historic event',
    'Art',
    'Nature',
    'Music and dance',
    'Food',
    'Architecture',
    'Gender',
    'Human & civil rights',
    'Museum',
    'Life event',
  ];

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

  private visibleNodes: Node[] = [];
  private visibleLinks: Link[] = [];

  private gData = {
    nodes: this.visibleNodes,
    links: this.visibleLinks,
  };

  constructor(private elementRef: ElementRef, private matDialog: MatDialog, private storyService: StoriesService) {
    // console.log(this.gData);
  }

  ngAfterViewInit(): void {
    this.storyService.findAll().subscribe((stories: Story[]) => {
      console.warn('stories');
      console.warn(stories);
      stories.forEach((story: Story) => this.stories.push({ name: story.title, tags: story.tags.split(';;'), image: story.coverImage }));
      console.warn(this.stories);

      this.generateTagNodes(this.tags);
      this.generateData(this.nodes, this.links, this.stories);
      console.warn(this.gData);
      this.graph = ForceGraph3D()(this.htmlElement);
      this.graph.backgroundColor('white');
      this.graph.linkColor((group: any) => (group ? '#000' : '#222'));
      this.graph.nodeColor((group: any) => {
        console.warn(group);
        return (group as Node).tags ? '#FF5738' : '#7fd8fe';
      });
      this.graph.onNodeClick(node => {
        if ((node as Node).tags) {
          console.warn(node);
        } else {
          this.generateTree(node as Node);
          this.graph.graphData(this.gData);
          //this.windowResize();
        }
      });
      this.graph.nodeThreeObject(node => {
        if (node.id !== undefined && node.id >= 21) {
          const map = new THREE.TextureLoader().load((node as Node).image!);
          map.minFilter = THREE.LinearFilter;
          const material = new THREE.SpriteMaterial({ map });
          const sprite = new THREE.Sprite(material);
          sprite.scale.set(32, 32, 1);
          return sprite;
        }

        return new THREE.Mesh(
          new THREE.SphereGeometry(10),
          new THREE.MeshLambertMaterial({
            color: '#FF5738',
            transparent: true,
            opacity: 0.75,
          })
        );
      });
      this.graph.linkWidth((group: any) => (group ? 2 : 10));
      this.graph.d3Force('link')?.distance((group: any) => 30);
      this.graph.graphData(this.gData);
      this.windowResize();
    });
  }

  @HostListener('window:resize')
  public windowResize(): void {
    const box = this.htmlElement.getBoundingClientRect();
    this.graph.width(box.width);
    this.graph.height(box.height - 125);
    // this.graph.controls().handleResize();
  }

  public openInfo(): void {
    this.matDialog.open(GraphInfoDialogComponent, {
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

  private generateData(nodes: Node[], links: Link[], data: GraphStory[]): void {
    data.forEach(story => {
      this.nodeId++;
      const newNode: Node = { id: this.nodeId, collapsed: true, name: story.name, tags: story.tags, image: story.image };
      this.nodes.push(newNode);
      story.tags.forEach(tag => {
        const tagId = this.tags.indexOf(tag);
        if (tagId !== -1) {
          this.links.push({ source: newNode.id, target: tagId, group: 1 });
        }
      });
    });
  }

  private generateTree(node: Node): void {
    console.warn('node');
    console.warn(node);
    if (node.collapsed) {
      this.nodes.forEach(story => {
        console.warn('story');
        console.warn(story);
        if (story.tags?.indexOf(node.name) !== -1) {
          this.visibleNodes.push(story);
          this.links.forEach((link: Link) => {
            if (link.source === story.id) {
              this.visibleLinks.push(link);
            }
          });
        }
      });
    } else {
      this.nodes.forEach(story => {
        if (story.tags?.indexOf(node.name) !== -1) {
          this.links.forEach((link: Link) => {
            if (link.source === story.id) {
              this.visibleLinks = this.visibleLinks.filter(a => a !== link);
            }
          });
          this.visibleNodes = this.visibleNodes.filter(a => a !== story);
        }
      });
    }
    node.collapsed = !node.collapsed;
  }

  private generateTagNodes(tags: string[]): void {
    let currentId = 0;
    tags.forEach((tag: string) => {
      this.visibleNodes.push({ id: currentId, collapsed: true, name: tag });
      currentId++;
    });
  }
}
