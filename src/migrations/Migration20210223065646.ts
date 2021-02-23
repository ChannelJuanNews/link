import { Migration } from '@mikro-orm/migrations';

export class Migration20210223065646 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" rename column "name" to "email";');
  }

}
