import React, { useState } from 'react';
import ReactDOM from 'react-dom';

type Donation = {
  amount: number;
  message: string;
  date: Date;
};

type Campaign = {
  title: string;
  description: string;
  goal: number;
  durationInDays: number;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  donations: Donation[];
};

const CampaignData: Campaign[] = [
    {
        title: "Campaign 1",
        description: "Description 1",
        goal: 100,
        durationInDays: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 1,
        donations: []
    },
    {
        title: "Campaign 2",
        description: "Description 2",
        goal: 200,
        durationInDays: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 2,
        donations: []
    },
    {
        title: "Campaign 3",
        description: "Description 3",
        goal: 300,
        durationInDays: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: 3,
        donations: []
    }
]

const AddCampaignPortal = ({ open, onClose, onAdd }: { open: boolean, onClose: () => void, onAdd: (campaign: any) => void }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal: '',
    durationInDays: '',
  });

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg min-w-[320px] shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Campaign</h2>
        <form onSubmit={e => {
          e.preventDefault();
          onAdd({
            ...form,
            goal: Number(form.goal),
            durationInDays: Number(form.durationInDays),
            createdAt: new Date(),
            updatedAt: new Date(),
            id: Date.now()
          });
          setForm({ title: '', description: '', goal: '', durationInDays: '' });
        }}>
          <div style={{ marginBottom: 12 }}>
            <input
              placeholder="Title"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
              style={{ width: '100%', padding: 8, marginBottom: 8 }}
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              required
              style={{ width: '100%', padding: 8, marginBottom: 8 }}
            />
            <input
              type="number"
              placeholder="Goal"
              value={form.goal}
              onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
              required
              style={{ width: '100%', padding: 8, marginBottom: 8 }}
            />
            <input
              type="number"
              placeholder="Duration (days)"
              value={form.durationInDays}
              onChange={e => setForm(f => ({ ...f, durationInDays: e.target.value }))}
              required
              style={{ width: '100%', padding: 8, marginBottom: 8 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px' }}>Cancel</button>
            <button type="submit" style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Add</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

type DonatePortalProps = {
  open: boolean;
  onClose: () => void;
  onDonate: (amount: number, message: string) => void;
  campaignTitle?: string;
};

const DonatePortal = ({ open, onClose, onDonate, campaignTitle }: DonatePortalProps) => {
  const [amount, setAmount] = React.useState('');
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (open) {
      setAmount('');
      setMessage('');
    }
  }, [open]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded-lg min-w-[320px] shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Donate to {campaignTitle || 'Campaign'}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onDonate(Number(amount), message);
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea
              placeholder="Write a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Donate
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

const Campaigns = () => {
  const [data, setData] = useState<Campaign[]>(CampaignData);
  const [open, setOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(null);

  const handleAdd = (campaign: Omit<Campaign, 'donations'>) => {
    setData([{ ...campaign, donations: [] }, ...data]);
    setOpen(false);
  };

  const handleDonate = (amount: number, message: string) => {
    if (selectedCampaign == null) return;
    setData(data =>
      data.map(c =>
        c.id === selectedCampaign
          ? { ...c, donations: [...c.donations, { amount, message, date: new Date() }] }
          : c
      )
    );
    setDonateOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="m-0 text-3xl font-bold">Campaigns</h1>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => setOpen(true)}
        >
          Add Campaign
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map(c => {
  const totalDonated = c.donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  return (
    <div key={c.id} className="bg-gray-50 rounded-lg shadow-md p-5 flex flex-col gap-2 min-w-[250px] max-w-sm w-full">
      <h2 className="text-xl font-bold m-0">{c.title}</h2>
      <p className="text-gray-700 m-0">{c.description}</p>
      <div className="flex justify-between mt-3">
        <span><b>Goal:</b> {c.goal}</span>
        <span><b>Days:</b> {c.durationInDays}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-green-700 font-semibold">Raised: {totalDonated}</span>
        <span className="text-gray-500">{c.donations.length} donations</span>
      </div>
      <small className="text-gray-500 mt-2">Created: {new Date(c.createdAt).toLocaleDateString()}</small>
      <div>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => {
            setSelectedCampaign(c.id);
            setDonateOpen(true);
          }}
        >
          Donate
        </button>
      </div>
    </div>
  );
})} 
      </div>
      <AddCampaignPortal open={open} onClose={() => setOpen(false)} onAdd={handleAdd} />
      <DonatePortal
  open={donateOpen}
  onClose={() => {
    setDonateOpen(false);
    setSelectedCampaign(null);
  }}
  onDonate={handleDonate}
  campaignTitle={selectedCampaign != null ? data.find(c => c.id === selectedCampaign)?.title : ''}
/>
    </div>
  );
};

export default Campaigns