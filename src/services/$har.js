
export function $har($apply) {
  this.current = undefined;
  this.files = [];
  this.select = f => {
    if (this.files.indexOf(f) !== -1) {
      this.current = f;
    }
  };
  this.addFiles = files => {
    const applyIfDone = () => {
      if (this.files.every(f => f.content !== undefined)) {
        $apply();
      }
    };
    files
      .filter(a => !this.files.find(f => a.name === f.name))
      .reduce((acc, f) => {
        const reader = new FileReader();
        const result = {
          name: f.name
        };
        reader.onload = e => {
          result.content = reader.result;
          try {
            result.parsed = JSON.parse(result.content);
            result.isValid = true;
            this.current = result;
          } catch {
            result.isValid = false;
          }
          applyIfDone();
        };
        reader.readAsText(f);
        acc.push(result);
        return acc;
      }, this.files);
    $apply();
  };
  /**
   * prepareMock delete all request which are not XHR
   */
  this.prepareMock = () => {
    const logs = this.current.parsed.log;
    logs.entries = logs.entries.filter(
      e => e._resourceType === "xhr" || e._resourceType === "fetch"
    );
    $apply();
  };
  this.reset = () => {
    this.current.parsed = JSON.parse(this.current.content || "{");
    $apply();
  };
  this.deleteFile = () => {
    const index = this.files.indexOf(this.current);
    this.files.splice(index, 1);
    $apply();
  };
  this.export = () => {
    return this.files.reduce((acc, file) => {
      // init
      if (!file.parsed) {
        return acc;
      }
      if (!acc.log) {
        acc.log = file.parsed.log;
      } else {
        acc.log.pages = acc.log.pages.concat(file.parsed.log.paged);
        acc.log.entries = acc.log.entries.concat(file.parsed.log.entries);
      }
      return acc;
    }, {});
  };
  this.deleteRows = (rows) => {
    this.current.parsed.log.entries = this.current.parsed.log.entries.filter(r => {
      return rows.indexOf(r) === -1;
    });
    $apply();
  }
}

$har.$id = "$har";
