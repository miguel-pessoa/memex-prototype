import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';

import * as THREE from 'three';
import { StoriesService } from '../stories.service';
import { GraphInfoDialogComponent } from './graph-info-dialog/graph-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

interface Node {
  id: number;
  name: string;
}

interface Author {
  name: string;
  coAuthors: Author[];
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
export class AuthorGraphComponent implements AfterViewInit {
  @ViewChild('graphDiv') graphDiv!: ElementRef;
  private graph!: ForceGraph3DInstance;

  private nodeId = 0;
  private authors = [
    {
      name: 'author1',
      coAuthors: [
        {
          name: 'author6',
          coAuthors: [
            { name: 'author8', coAuthors: [] },
            { name: 'author9', coAuthors: [] },
          ],
        },
        { name: 'author7', coAuthors: [{ name: 'author9', coAuthors: [] }] },
        {
          name: 'author2',
          coAuthors: [
            { name: 'author3', coAuthors: [{ name: 'author4', coAuthors: [] }] },
            { name: 'author4', coAuthors: [] },
          ],
        },
      ],
    },
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

  private gData = {
    nodes: this.nodes,
    links: this.links,
  };

  constructor(private elementRef: ElementRef, private dialog: MatDialog, private storyService: StoriesService) {
    // console.log(this.gData);
  }

  ngAfterViewInit(): void {
    this.generateData(this.nodes, this.links, this.authors, 0);
    console.warn(this.gData);
    this.graph = ForceGraph3D()(this.htmlElement);
    this.graph.backgroundColor('white');
    this.graph.linkColor((group: any) => (group ? '#000' : '#222'));
    this.graph.nodeColor((group: any) => (group ? '#FF5738' : '#7fd8fe'));
    this.graph.nodeThreeObject(node => {
      const map = new THREE.TextureLoader().load(this.storyService.getImageStory());
      map.minFilter = THREE.LinearFilter;
      const material = new THREE.SpriteMaterial({ map });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(32, 32, 1);
      return sprite;
    });
    this.graph.linkWidth((group: any) => (group ? 2 : 10));
    this.graph.d3Force('link')?.distance((group: any) => 20);
    this.graph.graphData(this.gData);
    this.windowResize();
  }

  @HostListener('window:resize')
  public windowResize(): void {
    const box = this.htmlElement.getBoundingClientRect();
    this.graph.width(box.width);
    this.graph.height(box.height - 110);
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

  private generateData(nodes: Node[], links: Link[], data: Author[], linkTo: number): void {
    data.forEach(author => {
      const repeated = nodes.filter((a: Node) => a.name === author.name).length !== 0;
      let newNode: Node;
      if (repeated) {
        nodes.forEach((node: Node) => {
          if (node.name === author.name) {
            newNode = node;
          }
        });
      } else {
        this.nodeId++;
        newNode = { id: this.nodeId, name: author.name };
        nodes.push(newNode);
      }
      if (linkTo) {
        this.links.push({ source: newNode!.id, target: linkTo, group: 1 });
      }
      if (author.coAuthors.length !== 0) {
        this.generateData(nodes, links, author.coAuthors, this.nodeId);
      }
    });
  }
}
