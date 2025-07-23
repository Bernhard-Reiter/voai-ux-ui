import type { Meta, StoryObj } from '@storybook/react';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from './Modal';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { AlertCircle, Trash2, UserPlus, Settings } from 'lucide-react';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ein flexibles Modal/Dialog-Component für Overlays und Popups.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Modal
export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Modal öffnen</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Titel</ModalTitle>
          <ModalDescription>
            Dies ist eine Beschreibung des Modals. Hier können Sie weitere Informationen hinzufügen.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Der Inhalt des Modals kann beliebig gestaltet werden. Sie können hier Formulare,
            Informationen oder andere Komponenten einfügen.
          </p>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Speichern</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Confirmation Dialog
export const Confirmation: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Löschen
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Sind Sie sicher?</ModalTitle>
          <ModalDescription>
            Diese Aktion kann nicht rückgängig gemacht werden. Das Element wird permanent gelöscht.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button variant="destructive">Endgültig löschen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Form Modal
export const FormModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Benutzer hinzufügen
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>Neuen Benutzer hinzufügen</ModalTitle>
          <ModalDescription>
            Fügen Sie einen neuen Benutzer zu Ihrem Team hinzu.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Max Mustermann"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="max@beispiel.de"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="role" className="text-sm font-medium">
              Rolle
            </label>
            <select
              id="role"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option>Mitglied</option>
              <option>Administrator</option>
              <option>Gast</option>
            </select>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Benutzer hinzufügen</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Alert Modal
export const Alert: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">
          <AlertCircle className="mr-2 h-4 w-4" />
          Warnung anzeigen
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <ModalTitle>Achtung erforderlich</ModalTitle>
              <ModalDescription>
                Es gibt ein Problem, das Ihre Aufmerksamkeit erfordert.
              </ModalDescription>
            </div>
          </div>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm">
            Ihr Speicherplatz ist fast voll. Sie haben nur noch 15% freien Speicherplatz.
            Bitte löschen Sie einige Dateien oder upgraden Sie Ihren Plan.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="warning">15% verfügbar</Badge>
            <span className="text-sm text-muted-foreground">850 MB von 1 GB verwendet</span>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Später</Button>
          <Button>Speicher verwalten</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Settings Modal
export const SettingsModal: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </ModalTrigger>
      <ModalContent className="sm:max-w-2xl">
        <ModalHeader>
          <ModalTitle>Einstellungen</ModalTitle>
          <ModalDescription>
            Verwalten Sie Ihre Anwendungseinstellungen und Präferenzen.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Benachrichtigungen</p>
                <p className="text-sm text-muted-foreground">
                  Erhalten Sie Benachrichtigungen über wichtige Updates
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Aktivieren Sie das dunkle Farbschema
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatische Updates</p>
                <p className="text-sm text-muted-foreground">
                  Installieren Sie Updates automatisch
                </p>
              </div>
              <input type="checkbox" className="h-4 w-4 rounded" defaultChecked />
            </div>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Abbrechen</Button>
          <Button>Änderungen speichern</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Large Content Modal
export const LargeContent: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Große Inhalte anzeigen</Button>
      </ModalTrigger>
      <ModalContent className="max-h-[80vh] sm:max-w-4xl">
        <ModalHeader>
          <ModalTitle>Nutzungsbedingungen</ModalTitle>
          <ModalDescription>
            Bitte lesen Sie unsere Nutzungsbedingungen sorgfältig durch.
          </ModalDescription>
        </ModalHeader>
        <div className="overflow-y-auto py-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="mb-4">
              <h3 className="mb-2 font-medium">§ {i + 1} Abschnitt {i + 1}</h3>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          ))}
        </div>
        <ModalFooter>
          <Button variant="outline">Ablehnen</Button>
          <Button>Akzeptieren</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};