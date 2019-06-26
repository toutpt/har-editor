export function $rows($apply) {
    this.rows = [];
    this.select = (row) => {
        this.rows.push(row);
        $apply();
    }
}