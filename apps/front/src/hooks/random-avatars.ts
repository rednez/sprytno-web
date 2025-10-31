import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';

export function useRandomAvatars(count: number) {
  const [links, setLinks] = useState<Array<{ id: string; src: string }>>([]);

  useEffect(() => {
    generateLinks();
  }, []);

  function generateLinks() {
    let idsSet = new Set<number>();

    function generateId() {
      const id = faker.number.int(70);
      if (idsSet.has(id)) {
        return generateId();
      } else {
        idsSet.add(id);
        return id;
      }
    }

    setLinks(
      Array.from({ length: count }).map(() => {
        const id = generateId();
        return {
          id: uuid4(),
          src: `https://i.pravatar.cc/150?img=${id}`,
        };
      }),
    );
  }

  return { links, generateLinks };
}
