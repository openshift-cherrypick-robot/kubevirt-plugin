import React from 'react';

import { SSHSecretCredentials } from '@catalog/CreateFromInstanceTypes/components/VMDetailsSection/components/SSHKeySection/utils/types';
import { V1alpha1PersistentVolumeClaim } from '@kubevirt-ui/kubevirt-api/kubevirt';
import { t } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import { DescriptionList } from '@patternfly/react-core';
import VirtualMachineDescriptionItem from '@virtualmachines/details/tabs/details/components/VirtualMachineDescriptionItem/VirtualMachineDescriptionItem';

import { humanizeBinaryBytes } from '../../../../../../../../utils/utils/humanize';

type DetailsRightGridProps = {
  pvcSource: V1alpha1PersistentVolumeClaim;
  namespace: string;
  sshSecretCredentials: SSHSecretCredentials;
};

const DetailsRightGrid: React.FC<DetailsRightGridProps> = ({
  pvcSource,
  namespace,
  sshSecretCredentials,
}) => {
  const pvcDiskSize = pvcSource?.spec?.resources?.requests?.storage;
  const sizeData = humanizeBinaryBytes(pvcDiskSize);

  return (
    <DescriptionList isHorizontal>
      <VirtualMachineDescriptionItem descriptionData={namespace} descriptionHeader={t('Project')} />
      <VirtualMachineDescriptionItem
        descriptionData={pvcDiskSize && sizeData?.string}
        descriptionHeader={t('Boot disk size')}
      />
      <VirtualMachineDescriptionItem
        descriptionData={pvcSource?.spec?.storageClassName}
        descriptionHeader={t('Storage class')}
      />
      <VirtualMachineDescriptionItem
        descriptionData={sshSecretCredentials?.sshSecretName}
        descriptionHeader={t('SSH key name')}
      />
    </DescriptionList>
  );
};

export default DetailsRightGrid;