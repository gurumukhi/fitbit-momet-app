function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">'Moment' App Settings</Text>}>
        <TextInput
          label="Birth Date (YYYY-MM-DD)"
          settingsKey="birthDate"
          placeholder="YYYY-MM-DD"
        />
        <TextInput
          label="Birth Time (HH:MM:SS)"
          placeholder="HH:MM:SS"
          settingsKey="birthTime"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
