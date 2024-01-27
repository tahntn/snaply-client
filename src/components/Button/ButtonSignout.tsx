import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icons } from '../ui/icons';
import { useLogout } from '@/hooks/index';
import { storage } from '@/lib/storage';

export function ButtonSignout() {
  const { mutate: logout } = useLogout();
  const { getString } = storage;
  const handleLogout = () => {
    const refreshToken = getString('snalpy-refresh');
    logout(refreshToken || '');
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-1 items-center cursor-pointer">
          <div>
            <Icons.logOut className="mr-2 h-4-w-4" />
          </div>
          <p>Log out</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Logout</DialogTitle>
          <DialogDescription>Are you sure you want to logout</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
