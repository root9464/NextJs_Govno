type Props = {
  title: string;
  body: string;
};

export const PostCard = ({ title, body }: Props) => (
  <div className='flex h-40 w-full flex-col justify-between rounded-[20px] bg-white px-5 py-[15px] text-black'>
    <div className='flex h-full w-full flex-col'>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>

    {/* <Button className='h-14 rounded-[10px] bg-[#212121] text-white'>Прочитать</Button> */}
  </div>
);
