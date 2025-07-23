-- Install nanoid function
-- WARNING: This function was manually added.
/**
  * Generates a random string of the specified length.
  * @param {string} prefix - The prefix of nanoid.
  * @param {number} length - The length of the string to generate.
  * @returns {string} - The generated string.
  * @example
  *  nanoid()
  *  nanoid('a'::text)
  *  nanoid(''::text, 10)
  *  nanoid('a'::text, 10)
  */
CREATE OR REPLACE FUNCTION nanoid(
    prefix text DEFAULT null,
    size int DEFAULT 21,
    alphabet text DEFAULT '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
)
RETURNS text AS $$
DECLARE
    idBuilder text := '';
    i int := 0;
    bytes bytea;
    alphabetIndex int;
    mask int;
    step int;
BEGIN
    mask := (2 << cast(floor(log(length(alphabet) - 1) / log(2)) as int)) -1;
    step := cast(ceil(1.6 * mask * size / length(alphabet)) AS int);

    WHILE true LOOP
        bytes := extensions.gen_random_bytes(size);
        WHILE i < size LOOP
            alphabetIndex := get_byte(bytes, i) & mask;
            IF alphabetIndex < length(alphabet) then
                idBuilder := idBuilder || substr(alphabet, alphabetIndex, 1);
                IF length(idBuilder) = size then
                    IF prefix IS NULL OR (prefix = '') IS NOT FALSE THEN
                        RETURN idBuilder;
                    ELSE
                        RETURN CONCAT(LOWER(prefix), '-', idBuilder);
                    END IF;
                END IF;
            END IF;

            i = i + 1;
        END LOOP;

        i := 0;
    END LOOP;

END
$$ LANGUAGE PLPGSQL STABLE;