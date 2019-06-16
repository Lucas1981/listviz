<template>
  <div>
    <button class="btn btn-primary mx-1 btn-sm" @click="loadCsvProxy($event)">Load CSV</button>
    <input type="file" class="d-none" ref="loadCsv" @change="loadCsv($event)"></button>
    <button class="btn btn-primary mx-1 btn-sm" @click="saveCsv($event)">Save CSV</button>
    <button class="btn btn-primary mx-1 btn-sm" @click="loadJsonProxy($event)">Load JSON</button>
    <input type="file" class="d-none" ref="loadJson" @change="loadJson($event)"></button>
    <button class="btn btn-primary mx-1 btn-sm" @click="saveJson($event)">Save JSON</button>
    <button class="btn btn-danger mx-1 btn-sm" @click="clearList()">Clear list</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FileHandler from '../classes/FileHandler';

@Component({
  name: 'FileMenu',
})
export default class FileMenu extends Vue {

  public loadCsvProxy(event) {
    const loadCsvPointer = this.$refs.loadCsv;
    loadCsvPointer.click();
  }

  public loadJsonProxy(event) {
    const loadJsonPointer = this.$refs.loadJson;
    loadJsonPointer.click();
  }

  public async loadCsv(event) {
    this.$store.commit('loading', true);
    const data = await FileHandler.handleCsvFile(event);
    const myArr = data.split('\n').filter(e => e !== '');
    this.$store.commit('loadFromCsv', myArr);
    this.$store.commit('loading', false);
  }

  public async loadJson(event) {
    this.$store.commit('loading', true);
    const data = await FileHandler.handleJsonFile(event);
    this.$store.commit('loadFromJson', data);
    this.$store.commit('loading', false);
  }

  public saveCsv(event) {
    const data = this.$store.getters.list
      .map(e => e.description)
      .join('\n');
    FileHandler.downloadCsvFile('data.csv', data);
  }

  public saveJson(event) {
    FileHandler.downloadJsonFile('data.json',
    {
      list: this.$store.getters.list.map(e => ({
        x: e.x, y: e.y, description: e.description
      })),
      config: this.$store.getters.config
    });
  }

  public clearList() {
    this.$store.commit('loading', true);
    this.$nextTick(() => {
      this.$store.commit('clearList');
      this.$store.commit('loading', false);
    });
  }
}
</script>
