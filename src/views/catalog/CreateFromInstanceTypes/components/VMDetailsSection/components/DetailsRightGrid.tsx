import React, { FC } from 'react';

import { useInstanceTypeVMStore } from '@catalog/CreateFromInstanceTypes/state/useInstanceTypeVMStore';
import { instanceTypeActionType } from '@catalog/CreateFromInstanceTypes/state/utils/types';
import { DYNAMIC_CREDENTIALS_SUPPORT } from '@kubevirt-utils/components/DynamicSSHKeyInjection/constants/constants';
import { useModal } from '@kubevirt-utils/components/ModalProvider/ModalProvider';
import SSHSecretModal from '@kubevirt-utils/components/SSHSecretSection/SSHSecretModal';
import { SSHSecretDetails } from '@kubevirt-utils/components/SSHSecretSection/utils/types';
import VirtualMachineDescriptionItem from '@kubevirt-utils/components/VirtualMachineDescriptionItem/VirtualMachineDescriptionItem';
import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { formatBytes } from '@kubevirt-utils/resources/vm/utils/disk/size';
import { DescriptionList } from '@patternfly/react-core';

import DynamicSSHKeyInjectionIntanceType from './DynamicSSHKeyInjectionIntanceType';

const DetailsRightGrid: FC = () => {
  const { t } = useKubevirtTranslation();
  const { createModal } = useModal();

  const { instanceTypeVMState, setInstanceTypeVMState, vmNamespaceTarget } =
    useInstanceTypeVMStore();
  const { pvcSource, sshSecretCredentials } = instanceTypeVMState;
  const showDynamicSSHKeyInjection = pvcSource?.metadata?.labels?.[DYNAMIC_CREDENTIALS_SUPPORT];
  const pvcDiskSize = pvcSource?.spec?.resources?.requests?.storage;
  const sizeData = formatBytes(pvcDiskSize);

  const setSSHCredentials = (credentials: SSHSecretDetails) => {
    setInstanceTypeVMState({
      payload: { ...credentials, appliedDefaultKey: sshSecretCredentials?.appliedDefaultKey },
      type: instanceTypeActionType.setSSHCredentials,
    });

    return Promise.resolve();
  };

  return (
    <DescriptionList isHorizontal>
      <VirtualMachineDescriptionItem
        descriptionData={vmNamespaceTarget}
        descriptionHeader={t('Project')}
      />
      <VirtualMachineDescriptionItem
        descriptionData={pvcDiskSize && sizeData}
        descriptionHeader={t('Boot disk size')}
      />
      <VirtualMachineDescriptionItem
        descriptionData={pvcSource?.spec?.storageClassName}
        descriptionHeader={t('Storage class')}
      />
      <VirtualMachineDescriptionItem
        onEditClick={() =>
          createModal((modalProps) => (
            <SSHSecretModal
              {...modalProps}
              initialSSHSecretDetails={sshSecretCredentials}
              namespace={vmNamespaceTarget}
              onSubmit={setSSHCredentials}
            />
          ))
        }
        descriptionData={sshSecretCredentials?.sshSecretName || t('Not configured')}
        descriptionHeader={t('SSH key name')}
        isEdit
      />
      {showDynamicSSHKeyInjection && <DynamicSSHKeyInjectionIntanceType />}
    </DescriptionList>
  );
};

export default DetailsRightGrid;