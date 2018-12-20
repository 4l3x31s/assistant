import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from "@ionic-native/sqlite";

/*
  Generated class for the TasksServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksServiceProvider {
  db: SQLiteObject = null;

  constructor(public http: HttpClient) {
    console.log('Hello TasksServiceProvider Provider');
  }
  setDatabase(db: SQLiteObject) {
    if(this.db === null) {
      this.db = db;
    }
  }

  createTables() {
    let sqlParametros = `CREATE TABLE parametros
                        (
                          parametro TEXT,
                          valor TEXT
                        )
                        ;`;
    this.db.executeSql(sqlParametros, []);
    let sqlPedido = `CREATE TABLE pedidos
                    (
                    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
                    desc_marca TEXT,
                    codigo TEXT,
                    item TEXT,
                    cantidad INTEGER,
                    precio NUMERIC,
                    precio_con_desc NUMERIC,
                    precio_total_bs NUMERIC,
                    nombre INTEGER,
                    observacion TEXT,
                    estado_pago TEXT,
                    pagina INTEGER
                    );`;
    this.db.executeSql(sqlPedido, []);
    let sqlMarcas = `CREATE TABLE marcas
                    (
                    id_marca INTEGER PRIMARY KEY AUTOINCREMENT,
                    desc_marca TEXT,
                    estado INTEGER
                    )
                    ;`;
    return this.db.executeSql(sqlMarcas , []);


  }
  addParametro(parametro:any){
    let sql = `INSERT INTO parametros(parametro,valor) VALUES(?,?)`;
    return this.db.executeSql(sql,[parametro.parametro, parametro.valor]);
  }
  actParametro(param: any){
    let sql = `UPDATE parametros
      SET
      valor = ?
      WHERE parametro = ?`;
    return this.db.executeSql(sql,[param.valor, param.parametro]);
  }
  getParametro(parametro: string){
    let sql = `SELECT * FROM parametros WHERE parametro = ?`;
    return this.db.executeSql(sql,[parametro]);
  }
  allParametros<Object>(){
    let sql = `SELECT * FROM parametros`;
    return this.db.executeSql(sql,[])
      .then(response =>{
        let parametros: any= [];
        for (let i = 0; i< response.rows.length; i++) {
          parametros.push(response.rows.item(i));
        }
        return Promise.resolve(parametros);
      })
      .catch(error => Promise.reject(error));
  }
  deletePedidos(pedido: any){
    let sql = `DELETE FROM pedidos WHERE id_pedido=?`;
    return this.db.executeSql(sql, [pedido.id_pedido]);
  }
  obtTodosPedidos(){
    let sql = `SELECT * FROM pedidos`;
    return this.db.executeSql(sql, [])
      .then(response => {
        let pedidos = [];
        for(let index = 0; index< response.rows.length; index ++){
          pedidos.push(response.rows.item(index));
        }
        return Promise.resolve(pedidos);
      })
      .catch(error => Promise.reject(error));
  }
  obtMarcas<Object>() {
    let sql = `SELECT * FROM marcas`;
    return this.db.executeSql(sql, [])
      .then(response => {
        let marcas = [];
        for(let i = 0; i< response.rows.length; i ++) {
          marcas.push(response.rows.item(i));
        }
        return Promise.resolve(marcas);
      })
      .catch(error => Promise.reject(error));
  }
  addMarcas(objMarca: any) {
    let sql = `INSERT INTO marcas(desc_marca, estado) values (?,?)`;
    return this.db.executeSql(sql, [objMarca.desc_marca, 1])
  }
  addPedidos<Object>(objPedidos: any) {
    let sql = `INSERT INTO pedidos(
      desc_marca,
      codigo,
      item,
      cantidad,
      precio,
      precio_con_desc,
      precio_total_bs,
      nombre,
      observacion,
      estado_pago) VALUES(?,?,?,?,?,?,?,?,?,?)`;
    return this.db.executeSql(sql, [objPedidos.desc_marca,
          objPedidos.codigo,
          objPedidos.item,
          objPedidos.cantidad,
          objPedidos.precio,
          objPedidos.precio_con_desc,
          objPedidos.precio_total_bs,
          objPedidos.nombre,
          objPedidos.observacion,
          objPedidos.estado_pago
    ]);
  }
  actPedidos(objPedidos) {
    let sql = `UPDATE pedidos
      SET
      desc_marca= ?,
      codigo = ?,
      item = ?,
      cantidad = ?,
      precio = ?,
      precio_con_desc= ?,
      precio_total_bs= ?,
      nombre= ?,
      observacion= ?,
      estado_pago= ?
      pagina = ?
      WHERE id_pedido = ?`;
    return this.db.executeSql(sql, [
      objPedidos.desc_marca,
      objPedidos.codigo,
      objPedidos.item,
      objPedidos.cantidad,
      objPedidos.precio,
      objPedidos.precio_con_desc,
      objPedidos.precio_total_bs,
      objPedidos.nombre,
      objPedidos.observacion,
      objPedidos.estado_pago,
      objPedidos.pagina,
      objPedidos.id_pedido
    ]);
  }
  actMarcas(objMarcas: any) {
    let sql = `UPDATE marcas
    SET
    desc_marca = ?,
    estado = ?
    WHERE id_marca = ?`;
    return this.db.executeSql(sql, [
      objMarcas.desc_marca,
      1,
      objMarcas.id_marca
    ])
  }
  elimPedidos(objPedidos: any){
    let sql = `DELETE FROM pedidos WHERE id_pedido = ?`;
    return this.db.executeSql(sql,[objPedidos.id_pedido]);
  }
  selecPedido(objPedidos: any) {
    let sql = `SELECT * FROM pedidos WHERE id_pedido = ?`;

    return this.db.executeSql(sql,[objPedidos.id_pedido]);
  }
}
