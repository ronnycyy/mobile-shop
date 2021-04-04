class CartItem {
  public product: string;
  public name: string;
  public image: string;
  public price: number;
  public countInStock: number;
  public count: number;

  constructor(product: string, name: string, image: string, price: number, countInStock: number, count: number) {
    this.product = product;
    this.name = name;
    this.image = image;
    this.price = price;
    this.countInStock = countInStock;
    this.count = count;
  }
}

export default CartItem;
