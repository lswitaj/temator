CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT topics_name_unique UNIQUE (name)
);
-- TODO: check on the backend topics uniqueness so that the user doesn't get on the unexpected UI error
-- TODO: Add user/admin and status column for topics added by visitors

CREATE FUNCTION
    on_topics_update()
RETURNS
    TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.date_updated := NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_date_updated
BEFORE UPDATE ON topics
FOR EACH ROW
EXECUTE FUNCTION on_topics_update();

INSERT INTO topics (name) VALUES
  ('ZDZICZENIE OBYCZAJÓW'),
  ('ŚWIAT NATURY'),
  ('JESIEŃ ŚREDNIOWIECZA'),
  ('GNUŚNY KARZEŁ'),
  ('ZAMOŻNY BEZDOMNY'),
  ('WOŹNA Z PODSTAWÓWKI'),
  ('PERSPEKTYWY W MIĘDZYBRODZIU'),
  ('WOLNE MIASTO MILICZ'),
  ('BAŁWAN Z KLASĄ'),
  ('DIETA PUDEŁKOWA');