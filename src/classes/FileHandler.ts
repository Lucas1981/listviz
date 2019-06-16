export default class FileHandler {
  public static async handleCsvFile(evt) {
    return new Promise( (resolve, reject) => {
      if (evt.target.files.length === 0) {
        reject('No file selected');
      }

      if (evt.target.files.length > 1) {
        reject('Only one file can be selected');
      }

      const file: any = evt.target.files[0]; // FileList object

      // Only process json files.
      if (!file.type.match('csv.*')) {
        reject('Only CSV files supported');
      }

      const reader: any = new FileReader();

      // Closure to capture the file information.
      reader.onload = ( (theFile) => {
        return (e) => {
          // Render thumbnail.
          resolve(e.target.result);
        };
      })(file);

      // Read in the file as a data URL.
      reader.readAsText(file);
    });
  }

  public static async handleJsonFile(evt) {
    return new Promise( (resolve, reject) => {
      if (evt.target.files.length === 0) {
        reject('No file selected');
      }

      if (evt.target.files.length > 1) {
        reject('Only one file can be selected');
      }

      const file: any = evt.target.files[0]; // FileList object

      // Only process json files.
      if (!file.type.match('json.*')) {
        reject('Only JSON files supported');
      }

      const reader: any = new FileReader();

      // Closure to capture the file information.
      reader.onload = ( (theFile) => {
        return (e) => {
          // Render thumbnail.
          resolve(JSON.parse(e.target.result));
        };
      })(file);

      // Read in the file as a data URL.
      reader.readAsText(file);
    });
  }

  public static downloadCsvFile(filename, data) {
    const a: any = document.createElement('a');
    a.setAttribute('download', filename);
    a.setAttribute('href', 'data:text/csv;charset=utf-8,' + data );
    a.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(a);
    a.click();
    document.getElementsByTagName('body')[0].removeChild(a);
  }

  public static downloadJsonFile(filename, json) {
    const a: any = document.createElement('a');
    a.setAttribute('download', filename);
    a.setAttribute('href', 'data:text/json;charset=utf-8,' + JSON.stringify(json) );
    a.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(a);
    a.click();
    document.getElementsByTagName('body')[0].removeChild(a);
  }
}
