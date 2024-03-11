import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useSettingStore } from '@/store';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
const DialogLanguage = () => {
  const { i18n, t } = useTranslation();
  const { openDialogLanguage, handleOpenDialogLanguage } = useSettingStore((s) => s);

  const schema = yup.object().shape({
    language: yup.string().required(),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    values: {
      language: i18n.language,
    },
  });
  const onSubmit = ({ language }: { language: string }) => {
    if (language === i18n.language) {
      handleOpenDialogLanguage();
      return;
    }
    i18n.changeLanguage(language);
    localStorage.setItem('snaply-language', language);
    toast.success(t('setting.language.languageChangedSuccessfully'));
    handleOpenDialogLanguage();
  };
  return (
    <Dialog open={!!openDialogLanguage} onOpenChange={handleOpenDialogLanguage}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">{t('setting.language.chooseLanguage')}</DialogTitle>
            </DialogHeader>
            <div>
              <FormField
                control={form.control}
                name="language"
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
                            <RadioGroupItem value="en" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">
                            {t('setting.language.english')}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="vi" />
                          </FormControl>
                          <FormLabel className="font-normal text-lg">
                            {t('setting.language.vietnamese')}
                          </FormLabel>
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

export default DialogLanguage;
