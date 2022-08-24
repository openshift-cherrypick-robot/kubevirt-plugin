import React, { FC } from 'react';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { Checkbox } from '@patternfly/react-core';

type SSHCheckboxProps = {
  vmName: string;
  sshServiceRunning: boolean;
  setSSHServiceRunning: (checked: boolean, event: React.FormEvent<HTMLInputElement>) => void;
};

const SSHCheckbox: FC<SSHCheckboxProps> = ({ vmName, sshServiceRunning, setSSHServiceRunning }) => {
  const { t } = useKubevirtTranslation();

  return (
    <Checkbox
      id="ssh-service-checkbox"
      className="kv-ssh-service-checkbox--main"
      label={t('Create a service to expose SSH access for VM {{vmName}}', {
        vmName,
      })}
      isChecked={sshServiceRunning}
      data-checked-state={sshServiceRunning}
      onChange={setSSHServiceRunning}
    />
  );
};

export default SSHCheckbox;
