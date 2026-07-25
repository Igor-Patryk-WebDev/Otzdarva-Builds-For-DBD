import { Button } from '@components/shared/Button'
import { useAnnouncementsPortalState } from '@contexts/AnnouncementsPortalContext'

export const AnnouncementsButton = () => {
  const { openAnnouncementsPortal } = useAnnouncementsPortalState();
  return (
    <div className='flex'>
      <Button
        preset="otz"
        className="px-3 rounded-md"
        onClick={() => openAnnouncementsPortal()}>
        Announcement
      </Button>
    </div>
  )
}
