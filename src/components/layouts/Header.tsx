"use client"
import { Autocomplete, Group, Burger, rem, Image, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './Header.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'


const links = [
  { link: '/', label: 'Home' },
];

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter()

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
    >
      {link.label}
    </Link>
  ));

  const submitSearch = () => {
    if (searchTerm.length > 0) {
      router.push(`/search?q=${searchTerm}`)
      setSearchTerm('')
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Image src="/images/eos_logo.webp" height={32} alt='Eos' />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <TextInput
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            visibleFrom="xs"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitSearch()
              }
            }}
          />
        </Group>
      </div>
    </header>
  );
}