import { FC, useEffect } from 'react';
import SearchItem from './SearchItem';
import useSearchUsers from '@/hooks/useSearchUsers';
import { useInView } from 'react-intersection-observer';

interface ListSearchProps {
  keyword: string;
}

const ListSearch: FC<ListSearchProps> = ({ keyword }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchUsers(keyword);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (data?.pages?.[0]?.data?.length === 0) {
    if (!!keyword) {
      return <p className="text-center">Không tìm thấy kết quả nào</p>;
    }
    return <p className="text-center">Nhập để tìm kiếm</p>;
  }
  return (
    <div className="flex flex-col gap-6 py-2 px-5 max-h-[calc(100vh-185px)] overflow-y-auto">
      {data &&
        data.pages?.map((listUser) => listUser.data.map((user) => <SearchItem user={user} />))}
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default ListSearch;
