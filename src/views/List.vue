<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8">
        <h3>List</h3>
        <div class="input-group my-3">
          <input v-model="newItem" @keyup.13="addItem()" type="text" class="form-control" placeholder="New list item" aria-label="Recipient's username" aria-describedby="button-addon2">
          <div class="input-group-append">
            <button type="submit" @click="addItem()" class="btn btn-outline-secondary" id="button-addon2">Button</button>
          </div>
        </div>
        <ul class="list-group">
          <li class="list-group-item" v-for="(item, index) in items">
            <div class="d-flex w-100 justify-content-between">
              <p class="mb-1">
                {{ index + 1 }}. {{ item.description }}
              </p>
              <div>
                <small v-if="index !== 0" class="text-muted px-1 cursor-pointer" @click="moveUpItem(index)">&uarr;</small>
                <small v-if="index !== items.length -1" class="text-muted px-1 cursor-pointer" @click="moveDownItem(index)">&darr;</small>
                <small class="text-muted px-1 cursor-pointer" @click="removeItem(index)">X</small>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="col-sm-4">
        <h3>Config</h3>
        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Type</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01" v-model="config.type">
            <option value="scalar">Scalar</option>
            <option value="quadrant">Quadrant</option>
            <option value="matrix">Matrix</option>
          </select>
        </div>
        <div class="input-group mb-3">
          <div class="form-check">
            <input v-model="config.showVerticalAxis" type="checkbox" class="form-check-input" id="showVerticalAxis">
            <label class="form-check-label" for="showVerticalAxis">Show vertical axis</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="form-check">
            <input v-model="config.showHorizontalAxis" type="checkbox" class="form-check-input" id="showHorizontalAxis">
            <label class="form-check-label" for="showHorizontalAxis">Show horizontal axis</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="form-check">
            <input v-model="config.showTicks" type="checkbox" class="form-check-input" id="showTicks">
            <label class="form-check-label" for="showTicks">Show ticks</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="form-check">
            <input v-model="config.showColors" type="checkbox" class="form-check-input" id="showColors">
            <label class="form-check-label" for="showColors">Show colors</label>
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Top header</span>
          </div>
          <input v-model="config.topHeader" type="text" class="form-control" aria-label="Top header" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Bottom header</span>
          </div>
          <input v-model="config.bottomHeader" type="text" class="form-control" aria-label="Top header" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Left header</span>
          </div>
          <input v-model="config.leftHeader" type="text" class="form-control" aria-label="Top header" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Right header</span>
          </div>
          <input v-model="config.rightHeader" type="text" class="form-control" aria-label="Top header" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Min y value</span>
          </div>
          <input v-model.number="config.minYValue" type="number" class="form-control" aria-label="Top header" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Max y value</span>
          </div>
          <input v-model.number="config.maxYValue" type="number" class="form-control">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Min x value</span>
          </div>
          <input v-model.number="config.minXValue" type="number" class="form-control">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">Max x value</span>
          </div>
          <input v-model.number="config.maxXValue" type="number" class="form-control">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .cursor-pointer {
    cursor: pointer;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class List extends Vue {
  public newItem: string = '';

  public get items(): any[] {
    return this.$store.getters.list;
  }

  public get config(): any {
    return this.$store.getters.config;
  }

  public addItem() {
    this.$store.commit('addListItem', this.newItem);
    this.newItem = '';
  }

  public moveUpItem(index: number) {
    this.$store.commit('moveUpItem', index);
  }

  public moveDownItem(index: number) {
    this.$store.commit('moveDownItem', index);
  }

  public removeItem(index) {
    this.$store.commit('removeItem', index)
  }
}
</script>
