export const show_notif = (status, toastStore) => {
  // const t = {
  //   message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
  // };
    switch (status) {
      
      case "complete":
        // toast.removeAll();
        toastStore.trigger( { message: 'Success'} );
        break;

      case "loading":
        toastStore.trigger( { message: 'Loading...'} );
        break;

      case "failes":
        // toast.removeAll();
        toastStore.trigger( { message: 'Error'} );
        break;

  }
  // toastStore.trigger(t);
};

// merging categories with items
export function categorizeItems(categories, items) {
    return categories.map(category => {
      const categoryItems = category.items.map(itemId => {
        return items.find(item => item.id === itemId);
      });
  
      return { ...category, items: categoryItems };
    });
  }
  
//get title translation from directus api
export function getTitle(collection, lang) {
    return collection.translations.find(t => t.languages_code.startsWith(lang)).title;
}

export function ISOtoLocal(isoTime) {
    const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = new Date(isoTime);
    const shiftedDate = new Date(date.toLocaleString("en-US", { timeZone: clientTimezone }));
  
    const formattedTime = shiftedDate.toLocaleString("ru-RU", { 
      year: "2-digit", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  
    return formattedTime;
  }

/* split text into paragraphs and replace \n with <br>
*
*   usage example:

*   {#each split_text(text) as paragraph} 
*      <p>{@html paragraph}</p>
*   { /each}
*/
export function split_text(text) {
    return text.split("\n\n").map((element) => {
        return element.replace(/\n/g, "<br>");
    });

}

export const formatDate = (date) => {

  const Ddate = new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  }).format(Ddate);
}

export const removeLangSlug = (url, langs) => {
  const parts = url.split('/');
  if (langs.includes(parts[1])) {
    parts.splice(1, 1);
    // parts.shift();
  }
  return parts.join('/');
}