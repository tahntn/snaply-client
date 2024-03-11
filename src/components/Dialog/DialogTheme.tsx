import { useSettingStore } from '@/store';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ThemeType, useTheme } from '@/context/ThemeProvider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
const DialogTheme = () => {
  const { openDialogTheme, handleOpenDialogTheme } = useSettingStore((s) => s);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const schema = yup.object().shape({
    valueTheme: yup.string().required(),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    values: {
      valueTheme: theme,
    },
  });

  const onSubmit = ({ valueTheme }: { valueTheme: string }) => {
    if (valueTheme === theme) {
      handleOpenDialogTheme();
      return;
    }
    setTheme(valueTheme as ThemeType);
    handleOpenDialogTheme();
  };
  return (
    <Dialog open={!!openDialogTheme} onOpenChange={handleOpenDialogTheme}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">{t('mode.selectTheme')}</DialogTitle>
            </DialogHeader>
            <div>
              <FormField
                control={form.control}
                name="valueTheme"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="light" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">{t('mode.light')}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dark" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">{t('mode.dark')}</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="system" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">{t('mode.system')}</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant={'outline'} size={'sm'}>
                {t('setting.cancel')}
              </Button>
              <Button size={'sm'} type="submit">
                {t('setting.apply')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTheme;
