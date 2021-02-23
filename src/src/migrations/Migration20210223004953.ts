import { Migration } from '@mikro-orm/migrations';

export class Migration20210223004953 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_hash_check";');
    this.addSql('alter table "user" alter column "hash" type varchar(255) using ("hash"::varchar(255));');
    this.addSql('alter table "user" alter column "hash" drop not null;');
  }

}
