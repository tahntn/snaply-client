import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import ListSearch from './ListSearch';
import { useGlobalStore } from '@/store';
import { DialogOtherUser } from '@/components/Dialog';
const SearchComponent = () => {
  const { isOpenDialogOtherUser } = useGlobalStore((state) => state);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qParam = searchParams.get('q');

  const [searchValue, setSearchValue] = useState(qParam || '');

  const debouncedValueSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!!debouncedValueSearch) {
      navigate(`?q=${debouncedValueSearch}`);
    } else {
      navigate('');
    }
  }, [debouncedValueSearch]);

  return (
    <div className="pt-10">
      <SearchInput value={searchValue} setValue={setSearchValue} />
      <div className="mt-5">
        <ListSearch keyword={debouncedValueSearch} />
      </div>

      {isOpenDialogOtherUser && <DialogOtherUser />}
    </div>
  );
};

export default SearchComponent;
