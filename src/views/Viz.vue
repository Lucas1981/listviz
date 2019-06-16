<template>
  <div>
    <div id="target"></div>
  </div>
</template>

<style>
.label-text,
.label-rect {
  cursor: pointer;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

const width = 1100;
const height = 720;
const padding = 40;
const colors = [ 'red', 'green', 'blue', 'orange' ];

@Component
export default class Viz extends Vue {
  private root: any = null;
  public get list(): any[] { return this.$store.getters.list; }
  public get config(): any { return this.$store.getters.config; }

  mounted() {
    this.initiateRootElement();
    this.renderAxes();
    this.renderLabels();
  }

  initiateRootElement() {
    this.root = d3.select('#target').append('svg')
      .attr('width', width)
      .attr('height', height);
  }

  renderAxes() {
    // Create a domain and spread it over a range
    if(this.config.showVerticalAxis) {
      const yRange = d3.scaleLinear()
        .domain(this.config.showTicks ? [this.config.minYValue, this.config.maxYValue] : [])
        .range([0, height - (2 * padding)]);
      const yAxis = d3.axisLeft(yRange).tickSize(this.config.showTicks ? 5 : 0);
      this.root.append('g')
        .attr('transform', `translate(${width / 2}, ${padding})`)
        .call(yAxis);
    }

    if(this.config.showHorizontalAxis) {
      const xRange = d3.scaleLinear()
        .domain(this.config.showTicks ? [this.config.minXValue, this.config.maxXValue] : [])
        .range([0, width - (2 * padding)]);
      const xAxis = d3.axisBottom(xRange).tickSize(this.config.showTicks ? 5 : 0);
      this.root.append('g')
        .attr('transform', `translate(${padding}, ${(height / 2)})`)
        .call(xAxis);
    }


    switch(this.config.type) {
      case 'scalar':
        this.renderScalarText();
        break;
      case 'quadrant':
        this.renderQuadrantText();
        break;
      case 'matrix':
        this.root.append('rect')
          .attr('x', padding)
          .attr('y', padding)
          .attr('width', width - (2 * padding))
          .attr('height', height - (2 * padding))
          .attr('fill', 'rgba(0, 0, 0, 0)')
          .attr('stroke', 'black');
        this.renderMatrixText();
        break;
      default:
        throw new Error('No valid config type');
    }
  }

  renderMatrixText() {
    if(this.config.showVerticalAxis) {
      this.root.append('text')
        .text(this.config.topHeader)
        .attr('transform', `translate(${width / 4}, ${padding / 2})`)
        .attr('text-anchor', 'middle');
      this.root.append('text')
        .text(this.config.bottomHeader)
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${padding / 2}, ${((height / 4) * 3)}), rotate(270)`)
    }

    if(this.config.showHorizontalAxis) {
      this.root.append('text')
        .text(this.config.leftHeader)
        .attr('text-anchor', 'middle')
        .attr('transform', `translate(${padding / 2}, ${(height / 4)}), rotate(270)`)
      this.root.append('text')
        .text(this.config.rightHeader)
        .attr('transform', `translate(${(width / 4) * 3}, ${padding / 2})`)
        .attr('text-anchor', 'middle');
    }
  }

  renderScalarText() {
    if(this.config.showVerticalAxis) {
      this.root.append('text')
        .text(this.config.topHeader)
        .attr('transform', `translate(${width / 2}, ${padding / 2})`)
        .attr('text-anchor', 'middle');
      this.root.append('text')
        .text(this.config.bottomHeader)
        .attr('transform', `translate(${width / 2}, ${height})`)
        .attr('text-anchor', 'middle')
        .attr('dy', '-1rem');
    }

    if(this.config.showHorizontalAxis) {
      this.root.append('text')
        .text(this.config.leftHeader)
        .attr('transform', `translate(${padding}, ${padding + (height / 2)})`);
      this.root.append('text')
        .text(this.config.rightHeader)
        .attr('transform', `translate(${width - padding}, ${padding + (height / 2)})`)
        .attr('text-anchor', 'end');
    }
  }

  renderQuadrantText() {
    if(this.config.showVerticalAxis) {
      this.root.append('text')
        .text(this.config.topHeader)
        .attr('transform', `translate(${(width / 2) - (padding / 2)}, ${(height / 2) - (padding / 2)})`)
        .attr('text-anchor', 'end');
      this.root.append('text')
        .text(this.config.bottomHeader)
        .attr('transform', `translate(${(width / 2) + (padding / 2)}, ${(height / 2) + padding})`)
    }

    if(this.config.showHorizontalAxis) {
      this.root.append('text')
        .text(this.config.rightHeader)
        .attr('transform', `translate(${(width / 2) + (padding / 2)}, ${(height / 2) - (padding / 2)})`)
      this.root.append('text')
        .text(this.config.leftHeader)
        .attr('transform', `translate(${(width / 2) - (padding / 2)}, ${(height / 2) + padding})`)
        .attr('text-anchor', 'end');
    }
  }

  renderLabels() {
    const watch: any = this.root.selectAll('g.label').data(this.list);
    const that = this;
    const getQuadrantColor = d => {
      if(!this.config.showColors) return 'grey';
      const h = (this.config.showVerticalAxis && d.x > (width / 2)) ? 1 : 0;
      const v = (this.config.showHorizontalAxis && d.y) > (height / 2) ? 2 : 0;
      return colors[h + v];
    };
    const dragHandler: any = d3.drag()
      .on('drag', function() {
        const index = parseInt(d3.select(this).attr('data-index'));
        that.list[index].x = d3.event.x;
        that.list[index].y = d3.event.y;
        d3.select(this)
          .attr('transform', d => `translate(${d3.event.x}, ${d3.event.y})`)
          .select('rect')
          .attr('fill', getQuadrantColor);
      });
    const labels = watch
      .enter()
      .append('g')
      .attr('class', 'label')
      .attr('data-index', (d, i) => i)
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    labels
      .append('text')
      .text(d => d.description)
      .attr("text-anchor", "middle")
      .attr('fill', 'black')
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "white")
      // For this sollution to get the bounding box:
      // https://stackoverflow.com/questions/32026194/how-to-add-a-background-color-to-d3-text-elements
      .call(function(selection) {
        selection.each(function(d) { d.bbox = this.getBBox(); })
      });

    labels
      .append('rect')
      .attr('x', d => -0.5 * d.bbox.width - 6)
      .attr('y', "-1rem")
      .attr('width', d => d.bbox.width + 12)
      .attr('height', "1.5rem")
      .attr('fill', getQuadrantColor)

    // Repaint the labels
    labels
      .append('text')
      .attr('class', 'label-text')
      .text(d => d.description)
      .attr("text-anchor", "middle")
      .attr('fill', 'black')
      .attr("font-family", "sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "white")

    dragHandler(this.root.selectAll('g.label'));
  }
}
</script>
