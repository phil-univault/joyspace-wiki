import { clsx } from 'clsx/lite';
import Link from 'next/link';
import { BiLogoGithub } from 'react-icons/bi';

export default function RepoLink() {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap">
      <span className="hidden sm:inline-block">
        Open Source at
      </span>
      <Link
        href="https://github.com/univault-org/JoySpace"
        target="_blank"
        className={clsx(
          'flex items-center gap-0.5',
          'text-main hover:text-main',
          'hover:underline',
        )}
      >
        <BiLogoGithub
          size={16}
          className="translate-y-[0.5px] hidden xs:inline-block"
        />
        Univault-org/JoySpace
      </Link>
    </span>
  );
}
