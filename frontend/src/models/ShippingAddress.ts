class ShippingAddress {
  public province: string;
  public city: string;
  public address: string;
  public postalCode: string;

  constructor(province: string, city: string, address: string, postalCode: string) {
    this.province = province;
    this.city = city;
    this.address = address;
    this.postalCode = postalCode;
  }
}

export default ShippingAddress;
