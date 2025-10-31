'use client';

import { useRandomAvatars } from '@/hooks/random-avatars';
import { Avatar, Button } from '@heroui/react';
import { useState } from 'react';
import { FaRepeat } from 'react-icons/fa6';

export function AvatarSelector({
  isInvalid,
  onPick,
}: {
  isInvalid: boolean;
  onPick: (src: string) => void;
}) {
  const { links, generateLinks } = useRandomAvatars(24);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);

  function handlePick({ id, src }: { id: string; src: string }) {
    setSelectedAvatarId(id);
    onPick(src);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <div>
          <div className={`text-md ${isInvalid ? 'text-red-700' : ''}`}>
            Chose your avatar
          </div>
          <div className="text-xs text-gray-500">
            The avatar is fake persons. Avatars are visible for all users.
          </div>
        </div>

        <Button
          isIconOnly
          radius="full"
          size="sm"
          variant="bordered"
          color="primary"
          onPress={generateLinks}
        >
          <FaRepeat />
        </Button>
      </div>

      <div className="flex flex-row flex-wrap justify-between gap-3">
        {links.map(({ id, src }) => (
          <Avatar
            key={id}
            src={src}
            alt={`Random avatar ${src}`}
            size="lg"
            isBordered={selectedAvatarId === id}
            color="primary"
            onClick={() => handlePick({ id, src })}
          />
        ))}
      </div>
    </div>
  );
}
