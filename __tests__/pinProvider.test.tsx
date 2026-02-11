import React, { useEffect } from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { PinProvider, usePin } from '../src/hooks/PinProvider';

const Holder = ({ onReady }: { onReady: (value: ReturnType<typeof usePin>) => void }) => {
  const pin = usePin();
  useEffect(() => {
    onReady(pin);
  }, [pin, onReady]);
  return null;
};

describe('PinProvider', () => {
  it('locks when lock() is called after setting a pin', async () => {
    let api: ReturnType<typeof usePin> | null = null;
    render(
      <PinProvider>
        <Holder onReady={(value) => (api = value)} />
      </PinProvider>
    );

    await act(async () => {
      await api?.setNewPin('1234');
    });

    await waitFor(() => expect(api?.hasPin).toBe(true));

    act(() => {
      api?.lock();
    });

    await waitFor(() => expect(api?.unlocked).toBe(false));
  });
});
