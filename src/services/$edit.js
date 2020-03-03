
export function $edit($apply) {
    this.edit = (item) => {
        this.ref = item;
        this.item = Object.assign({}, item);
    }

    this.save = () => {
        Object.assign(this.ref, this.item);
        this.ref = null;
        $apply();
    }
}
$edit.$id = '$edit';