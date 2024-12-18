'use client';
import { useUserStore } from '@/shared/store/userStore';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { useState } from 'react';

type Response = {
  message: string;
  user: {
    id: string;
    name: string;
    password: string;
  };
};

function areAllValuesFilled<T extends object>(obj: T): boolean {
  return Object.values(obj).every((value) => value !== '' && value !== null && value !== undefined);
}

export const Header = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [inputsData, setInputsData] = useState({
    name: '',
    password: '',
  });

  const { setUser, user } = useUserStore();

  return (
    <div className='flex h-fit w-full flex-col items-center justify-center'>
      <header className='h-50 m-auto mt-10 flex w-[90%] flex-row items-center justify-between rounded-[20px] bg-white px-[15px] py-2.5'>
        <h1 className='text-xl font-semibold text-black'>Reddit clone</h1>
        {areAllValuesFilled(user) ? (
          <p className='flex h-10 w-[80px] flex-row items-center justify-center rounded-[10px] border-2 border-[#212121] text-black'>
            {user?.name}
          </p>
        ) : (
          <Button className='rounded-[10px] bg-[#212121] text-white' onPress={onOpen}>
            Sign in
          </Button>
        )}

        <Modal
          backdrop='blur'
          classNames={{
            backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent className='text-black'>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Sing in / Sing up</ModalHeader>
                <ModalBody>
                  <Input label='Name' type='text' onChange={(e) => setInputsData({ ...inputsData, name: e.target.value })} />
                  <Input label='Password' type='text' onChange={(e) => setInputsData({ ...inputsData, password: e.target.value })} />
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='flat' onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    className='bg-[#212121] text-white'
                    onPress={() => {
                      setUser(inputsData);
                      onClose();
                    }}
                  >
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </header>
    </div>
  );
};
