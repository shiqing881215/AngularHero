// This is a in-memory db service to stimulate http calls
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
      // const name maps the url, for this the url will be api/heroes
      const heroes = [
        {id : 1, name : 'Hulk'},
        {id : 2, name : 'IronMan'},
        {id : 3, name : 'Captain America'},
        {id : 4, name : 'Black Widow'},
        {id : 5, name : 'Thor'},
        {id : 6, name : 'Scarlet Witch'}
      ];
      return {heroes};
    }
}