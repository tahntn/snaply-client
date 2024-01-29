import { FC, useEffect } from 'react';
import SearchItem from './SearchItem';
import useSearchUsers from '@/hooks/useSearchUsers';
import { useInView } from 'react-intersection-observer';
import { Icons } from '@/components/ui/icons';
import NoResults from '@/components/NoResults';
import { useTranslation } from 'react-i18next';

interface ListSearchProps {
  keyword: string;
}

const ListSearch: FC<ListSearchProps> = ({ keyword }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchUsers(keyword);
  const { t } = useTranslation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (data?.pages?.[0]?.data?.length === 0) {
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!keyword) {
      return <NoResults />;
    }
    return (
      <div className="flex flex-col items-center">
        <Icons.userSearch className="w-[50px] h-[50px] my-3" />
        <p className="text-center text-xl">{t('search.enterToSearch')}</p>
      </div>
    );
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
