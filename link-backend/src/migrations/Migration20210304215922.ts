import { Migration } from "@mikro-orm/migrations";

export class Migration20210304215922 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "link" ("id" serial primary key, "url" varchar(255) not null, "icon" varchar(255) null, "num_clicks" int4 not null, "num_views" int4 null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int4 not null);'
    );
    this.addSql(
      'alter table "link" add constraint "link_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    );
  }
}
