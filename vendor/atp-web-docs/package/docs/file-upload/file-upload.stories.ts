import type {Meta, StoryObj} from '@storybook/web-components-vite';
import {withActions} from 'storybook/actions/decorator';
import {html} from 'lit';
import './file-upload';

const meta: Meta = {
  component: 'atp-file-upload',
  title: 'Components/FileUpload',
  tags: ['autodocs'],
  parameters: {
    docs: {
      component: 'FileUpload',
    },
    actions: {
      handles: ['fileUploadOutput'],
    },
  },
  decorators: [withActions],
  argTypes: {},
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    subLabel: 'PNG, SVG, PDF, 5 MB max.',
    maxFileSize: -1,
    allowedFileTypes: [],
    maxNumberOfFiles: -1,
    isCentered: false,
    showFileList: true,
    fileItemList: [
      {
        id: '1231',
        file: new File([''], 'name.jpg', {type: 'JPG'}),
        warnings: [],
        isSuccess: false,
        isFailure: false,
      },
      {
        id: '1234',
        file: new File([''], 'a name with a more descriptive title.jpg', {type: 'png'}),
        warnings: ['file too large'],
        isSuccess: false,
        isFailure: true,
      },
      {
        id: '1235',
        file: new File([''], 'another name.jpg', {type: 'xlsx'}),
        warnings: [],
        isSuccess: true,
        isFailure: false,
      },
    ],
  },
  render: ({
    subLabel,
    isCentered,
    showFileList,
    maxFileSize,
    allowedFileTypes,
    maxNumberOfFiles,
    fileItemList,
  }) =>
    html`<atp-file-upload
        id="file-upload"
        .subLabel=${subLabel}
        .maxFileSize=${maxFileSize}
        .allowedFileTypes=${allowedFileTypes}
        .maxNumberOfFiles=${maxNumberOfFiles}
        .fileItemList=${fileItemList}
        .isCentered=${isCentered}
        .showFileList=${showFileList}
      ></atp-file-upload>
      <script>
        component = document.getElementById('file-upload');

        component?.addEventListener('fileUploadOutput', ({detail}) => {
          component.fileItemList = detail;
        });
      </script>`,
  parameters: {
    docs: {
      source: {
        code: '<atp-file-upload></atp-file-upload>',
      },
    },
  },
};
