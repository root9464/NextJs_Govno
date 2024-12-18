'use client';

import { PostCard } from '@/Components/PostCard';
import { useUserStore } from '@/shared/store/userStore';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { useState } from 'react';

type Post = {
  title: string;
  content: string;
};

export default function Home() {
  const { user } = useUserStore();

  const [posts, setPosts] = useState<Post[]>([]);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [inputsData, setInputsData] = useState({
    title: '',
    content: '',
  });
  return (
    <div className='h-[calc(100%-40px-100px)] w-full px-5 py-8'>
      <div className='relative flex h-[520px] w-full flex-col gap-5 overflow-y-scroll'>
        {posts.map((post) => (
          <PostCard key={post.title} title={post.title} body={post.content} />
        ))}
      </div>

      <Button variant='bordered' className='mt-10 h-10 w-full rounded-[10px] text-white' onPress={onOpen}>
        Опубликовать пост
      </Button>

      <Modal
        backdrop='blur'
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className='text-black'>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Sing in / Sing up</ModalHeader>
              <ModalBody>
                <Input label='Title' type='text' onChange={(e) => setInputsData({ ...inputsData, title: e.target.value })} />
                <Input label='Content' type='text' onChange={(e) => setInputsData({ ...inputsData, content: e.target.value })} />
              </ModalBody>
              <ModalFooter>
                <Button className='bg-[#212121] text-white' onPress={() => setPosts([...posts, inputsData])}>
                  Publish
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
