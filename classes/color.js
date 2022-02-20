class Color {
    space = '';
    componentNames = '';
    
    get components() {
        return this.componentNames.split('').map((ch) => this[`_${ch}`]);
    };
    
    constructor(space, componentNames = undefined) {
        this.space = space;
        this.componentNames = componentNames || space;
    }
}

export default Color;