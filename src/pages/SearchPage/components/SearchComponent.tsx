import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks';
import ListSearch from './ListSearch';

const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qParam = searchParams.get('q');
  const [searchValue, setSearchValue] = useState(qParam || '');
  const debouncedValueSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedValueSearch.trim() && !!debouncedValueSearch.trim()) {
      navigate(`?q=${debouncedValueSearch}`);
    } else {
      navigate('');
    }
  }, [debouncedValueSearch, navigate]);

  return (
    <div className="pt-10">
      <SearchInput value={searchValue} setValue={setSearchValue} />
      <div className="mt-5">
        <ListSearch keyword={debouncedValueSearch.trim()} />
      </div>
    </div>
  );
};

export default SearchComponent;
