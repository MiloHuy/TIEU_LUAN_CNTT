import clsx from 'clsx';
import TooltipContentCombine from 'combine/tooltip-content/TooltipContent';
import { PrivacyPost, PrivacyPostLabel } from 'features/select/select-privacy-post/SelectPrivacyPost';
import { Earth, LockKeyhole, MoreHorizontal, User } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const HeaderPostUser = ({ img, name, href, action, className, privacy }) => {
  const renderIconPrivacy = useMemo(() => {
    switch (privacy) {
      case PrivacyPost.ALONE:
        return (
          <TooltipContentCombine
            trigger={<LockKeyhole size={16} strokeWidth={1.25} />}
            title={PrivacyPostLabel.ALONE} />
        )
      case PrivacyPost.FOLLOWER:
        return (
          <TooltipContentCombine
            trigger={<User size={16} strokeWidth={1.25} />}
            title={PrivacyPostLabel.FOLLOWER} />
        )
      case PrivacyPost.EVERYONE:
        return (
          <TooltipContentCombine
            trigger={<Earth size={16} strokeWidth={1.25} />}
            title={PrivacyPostLabel.EVERYONE} />
        )
      default:
        return
    }
  }, [privacy])

  return (
    <div className={clsx('px-3 border border-black dark:border-white flex justify-between overflow-hidden', className)}>
      <div className='w-max h-full flex items-center gap-2 -translate-x-3'>
        <div className='w-30 h-full '>
          <img
            loading="lazy"
            alt="img"
            className="object-fill w-full h-full rounded-full"
            src={img ? img : 'https://github.com/shadcn.png'}
          />
        </div>

        <div className='grid items-start font-quick_sans'>
          <div className='flex gap-2 items-center'>
            <Link to={href}>
              <p className='text-lg font-lixend text-black dark:text-white'> {name ? name : 'User'}</p>
            </Link>

            {renderIconPrivacy}
          </div>

          <p className='text-sm font-quick_sans text-black dark:text-white'>
            3 ngày
          </p>
        </div>
      </div>

      <div className='h-full flex items-center'>
        {
          action ? action : <MoreHorizontal size={20} strokeWidth={1.25} />
        }
      </div>
    </div>
  )
}

HeaderPostUser.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  href: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string,
}

export default HeaderPostUser
