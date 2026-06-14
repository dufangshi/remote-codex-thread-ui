import { useEffect, useRef, useState } from 'react';

import type { ComposerAttachmentDraft } from './composerUtils';

export type AttachmentPreviewMap = Record<string, string>;

function revokeCachedPreviewUrls(previewUrlCache: Map<string, string>) {
  for (const previewUrl of previewUrlCache.values()) {
    URL.revokeObjectURL(previewUrl);
  }
  previewUrlCache.clear();
}

export function useAttachmentPreviewUrls({
  attachments,
  isShellView,
}: {
  attachments: ComposerAttachmentDraft[];
  isShellView: boolean;
}) {
  const previewUrlCacheRef = useRef<Map<string, string>>(new Map());
  const [attachmentPreviewUrls, setAttachmentPreviewUrls] =
    useState<AttachmentPreviewMap>({});

  useEffect(() => {
    const previewUrlCache = previewUrlCacheRef.current;

    if (isShellView) {
      revokeCachedPreviewUrls(previewUrlCache);
      setAttachmentPreviewUrls({});
      return;
    }

    const nextPreviewUrls: AttachmentPreviewMap = {};
    const activeClientIds = new Set<string>();

    for (const attachment of attachments) {
      if (attachment.kind !== 'photo') {
        continue;
      }

      activeClientIds.add(attachment.clientId);
      let previewUrl = previewUrlCache.get(attachment.clientId);
      if (!previewUrl) {
        previewUrl = URL.createObjectURL(attachment.file);
        previewUrlCache.set(attachment.clientId, previewUrl);
      }
      nextPreviewUrls[attachment.clientId] = previewUrl;
    }

    for (const [clientId, previewUrl] of previewUrlCache.entries()) {
      if (activeClientIds.has(clientId)) {
        continue;
      }
      URL.revokeObjectURL(previewUrl);
      previewUrlCache.delete(clientId);
    }

    setAttachmentPreviewUrls(nextPreviewUrls);
  }, [attachments, isShellView]);

  useEffect(() => {
    const previewUrlCache = previewUrlCacheRef.current;
    return () => {
      revokeCachedPreviewUrls(previewUrlCache);
    };
  }, []);

  return attachmentPreviewUrls;
}
