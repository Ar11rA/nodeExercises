dropdb -U aritraaritra testdb
createdb -U aritraaritra testdb
pg_dump -U aritraaritra apidb -f ./public/test/exercise.sql
psql -U aritraaritra -d testdb -f ./public/test/exercise.sql
