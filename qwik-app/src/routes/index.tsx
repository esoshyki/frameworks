import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import NewsList from '~/components/news-list/news-list';

export default component$(() => {
  return (
    <div class="app">
      <NewsList />
    </div>
  )
  });

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
