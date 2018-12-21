export class Pedidos {
  constructor(
    public pagina: number,
  public desc_marca:string,
  public codigo :string,
  public item :string,
  public cantidad :number,
  public precio :number,
  public precio_con_desc :number,
  public precio_total_bs :number,
  public nombre :string,
  public observacion :string,
  public estado_pago :string)
    {

  }
}
