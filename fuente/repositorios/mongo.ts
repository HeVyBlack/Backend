import { Collection, Document, MongoClient } from 'mongodb';

export abstract class Mongo<T extends Document> {
  private static readonly cliente_mongo = new MongoClient('mongodb://localhost:27017');

  private static readonly base_datos = this.cliente_mongo.db('Música');

  private readonly base_datos = Mongo.base_datos;

  protected readonly collección: Collection<T>;

  constructor(nombre: string) {
    this.collección = this.base_datos.collection(nombre);
  }
}
