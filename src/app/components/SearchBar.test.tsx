import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import * as services from '../services/index';

jest.mock('../services/index', () => {
  return {
    ...jest.requireActual('../services/index'),
    fetchUniversities: jest.fn(),
    fetchSearchHistory: jest.fn(),
    saveSearchTerm: jest.fn(),
  };
});



test('handles search type change', () => {
  render(<SearchBar />);

  // Simulate selecting a different search type
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'country' } });

  // Check if the search type state is updated
  expect(screen.getByRole('combobox').value).toBe('country');
});

test('renders UniversityCard components when universities are available', async () => {
  render(<SearchBar />);

  // Simulate typing in the search input
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Middle' } });

  // Wait for the search to complete (since we're using async function)
  await screen.findByText('University Name');

  // Check if UniversityCard components are rendered
  expect(screen.getByText('University Name')).toBeInTheDocument();
});

test('handles search history retrieval correctly', async () => {
  const mockFetchSearchHistory = jest.spyOn(services, 'fetchSearchHistory');
  mockFetchSearchHistory.mockResolvedValue([{ term: 'TestTerm' }]);
  render(<SearchBar />);

  // Simulate clicking the input field to show history
  fireEvent.click(screen.getByRole('textbox'));

  // Wait for the search history to be displayed
  await waitFor(() => screen.getByText('TestTerm'));

  // Check if search history is rendered
  expect(screen.getByText('TestTerm')).toBeInTheDocument();
});

test('handles search history retrieval correctly', async () => {
  const mockFetchSearchHistory = jest.spyOn(services, 'fetchSearchHistory');
  mockFetchSearchHistory.mockResolvedValue([{ term: 'TestTerm' }]);

  render(<SearchBar />);

  // Simulate clicking the input field to show history
  fireEvent.click(screen.getByRole('textbox'));

  // Wait for the search history to be displayed
  await waitFor(() => screen.getByText('TestTerm'));

  // Check if search history is rendered
  expect(screen.getByText('TestTerm')).toBeInTheDocument();
});

test('saves search term when searching', async () => {
  render(<SearchBar />);

  // Mocking API data
  const mockFetchUniversities = jest.spyOn(services, 'fetchUniversities');
  mockFetchUniversities.mockResolvedValue([
    { item: { name: 'University A', country: 'Country A' } },
    { item: { name: 'University B', country: 'Country B' } },
  ]);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test' } });

  await waitFor(() => expect(services.saveSearchTerm).toHaveBeenCalledWith('Test'));
});
