import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, Power } from "lucide-react";
import { Link } from "react-router-dom";

const mqttSchema = z.object({
  enabled: z.boolean(),
  hostname: z.string().min(1, "Hostname required"),
  port: z.number().min(1, "Port must be positive").max(65535, "Invalid port"),
  username: z.string(),
  password: z.string(),
  tlsEnabled: z.boolean(),
  certValidationEnabled: z.boolean(),
});

const safetySchema = z.object({
  enabled: z.boolean(),
  relay1Default: z.boolean(),
  relay2Default: z.boolean(),
  relay3Default: z.boolean(),
  relay4Default: z.boolean(),
});

const overloadSchema = z.object({
  enabled: z.boolean(),
  powerThreshold: z.number().positive("Power threshold must be positive"),
  disconnectAll: z.boolean(),
  relay1Disconnect: z.boolean(),
  relay2Disconnect: z.boolean(),
  relay3Disconnect: z.boolean(),
  relay4Disconnect: z.boolean(),
});

const Settings = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const mqttForm = useForm<z.infer<typeof mqttSchema>>({
    resolver: zodResolver(mqttSchema),
    defaultValues: {
      enabled: true,
      hostname: "localhost",
      port: 1883,
      username: "",
      password: "",
      tlsEnabled: false,
      certValidationEnabled: true,
    },
  });

  const safetyForm = useForm<z.infer<typeof safetySchema>>({
    resolver: zodResolver(safetySchema),
    defaultValues: {
      enabled: false,
      relay1Default: false,
      relay2Default: false,
      relay3Default: false,
      relay4Default: false,
    },
  });

  const overloadForm = useForm<z.infer<typeof overloadSchema>>({
    resolver: zodResolver(overloadSchema),
    defaultValues: {
      enabled: false,
      powerThreshold: 3000,
      disconnectAll: true,
      relay1Disconnect: false,
      relay2Disconnect: false,
      relay3Disconnect: false,
      relay4Disconnect: false,
    },
  });

  const onMqttSubmit = (values: z.infer<typeof mqttSchema>) => {
    console.log("MQTT settings:", values);
    toast({
      title: t('mqtt_settings_saved'),
      description: t('mqtt_settings_updated'),
    });
  };

  const onSafetySubmit = (values: z.infer<typeof safetySchema>) => {
    console.log("Safety settings:", values);
    toast({
      title: t('safety_settings_saved'),
      description: t('safety_settings_updated'),
    });
  };

  const onOverloadSubmit = (values: z.infer<typeof overloadSchema>) => {
    console.log("Overload protection settings:", values);
    toast({
      title: t('overload_settings_saved'),
      description: t('overload_settings_updated'),
    });
  };

  const handleReboot = () => {
    console.log("Rebooting device...");
    toast({
      title: t('device_rebooting'),
      description: t('device_reboot_initiated'),
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">{t('settings')}</h1>
        </div>

        <div className="columns-1 md:columns-1 lg:columns-2 gap-6 space-y-6">
          {/* MQTT Settings */}
          <Card className="break-inside-avoid mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-info"></div>
                {t('mqtt_settings')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...mqttForm}>
                <form onSubmit={mqttForm.handleSubmit(onMqttSubmit)} className="space-y-4">
                  <FormField
                    control={mqttForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>{t('enable_mqtt')}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="hostname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('hostname')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="localhost" 
                            {...field}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('port')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="1883"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('username')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="username" 
                            {...field}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('password')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="password" 
                            {...field}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="tlsEnabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>{t('enable_tls')}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!mqttForm.watch("enabled")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={mqttForm.control}
                    name="certValidationEnabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>{t('enable_cert_validation')}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!mqttForm.watch("enabled") || !mqttForm.watch("tlsEnabled")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    {t('save_mqtt_settings')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Safety Settings */}
          <Card className="break-inside-avoid mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning"></div>
                {t('safety_settings')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...safetyForm}>
                <form onSubmit={safetyForm.handleSubmit(onSafetySubmit)} className="space-y-4">
                  <FormField
                    control={safetyForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>{t('enable_function')}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">{t('default_relay_states')}:</Label>
                    
                    <FormField
                      control={safetyForm.control}
                      name="relay1Default"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>{t('relay')} 1</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!safetyForm.watch("enabled")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={safetyForm.control}
                      name="relay2Default"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>{t('relay')} 2</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!safetyForm.watch("enabled")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={safetyForm.control}
                      name="relay3Default"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>{t('relay')} 3</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!safetyForm.watch("enabled")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={safetyForm.control}
                      name="relay4Default"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>{t('relay')} 4</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!safetyForm.watch("enabled")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {t('save_safety_settings')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Overload Protection */}
          <Card className="break-inside-avoid mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                {t('overload_protection')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...overloadForm}>
                <form onSubmit={overloadForm.handleSubmit(onOverloadSubmit)} className="space-y-4">
                  <FormField
                    control={overloadForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>{t('enable_overload_protection')}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={overloadForm.control}
                    name="powerThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('power_threshold')} ({t('watts')})</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder={t('power_threshold_placeholder')}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            disabled={!overloadForm.watch("enabled")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={overloadForm.control}
                    name="disconnectAll"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>{t('disconnect_all_relays')}</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!overloadForm.watch("enabled")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {!overloadForm.watch("disconnectAll") && (
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">{t('relays_to_disconnect')}:</Label>
                      
                      <FormField
                        control={overloadForm.control}
                        name="relay1Disconnect"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <FormLabel>{t('relay')} 1</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!overloadForm.watch("enabled")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={overloadForm.control}
                        name="relay2Disconnect"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <FormLabel>{t('relay')} 2</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!overloadForm.watch("enabled")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={overloadForm.control}
                        name="relay3Disconnect"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <FormLabel>{t('relay')} 3</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!overloadForm.watch("enabled")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={overloadForm.control}
                        name="relay4Disconnect"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <FormLabel>{t('relay')} 4</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={!overloadForm.watch("enabled")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    {t('save_overload_settings')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* System Actions */}
          <Card className="break-inside-avoid mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                {t('system_actions')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t('device_reboot')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('device_reboot_description')}
                </p>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Power className="h-4 w-4 mr-2" />
                    {t('reboot_device')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('confirm_reboot')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('reboot_confirmation_message')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReboot}>
                      {t('confirm')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;