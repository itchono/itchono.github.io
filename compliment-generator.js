// Obtain a reference to the div element by its id
var numspace = document.getElementById('compliments');

numspace.onclick = genCompliment;

function genCompliment() {
    var compliments = ['You handled that so well.', 'I love when you hug me.', 'I Trust You.', 'I love when you hold me tight.', 'Every morning when I wake up, I think of you and smile.', 'I love getting to spend my time with you.', 'Thank you for being such a great listener. You really know how to be there for someone.', 'Wow, you were actually listening! I’m impressed!', 'I love you exactly the way you are.', 'You are the funniest guy that I have ever met.', 'Is there anything that you can’t do?', 'Your smile makes my heart melt.', 'I love how easy it is to talk to you. You make me feel comfortable sharing anything.', 'You always make me feel so beautiful and appreciated.', 'I Know That You Will Always Have My Back, Because That Is The Kind Of Person You Are.', 'I love spending every second of my time with you.', "I can’t help but blush around you. I actually turn beet red and it's embarrassing.", 'I appreciate everything that you do for me.', 'I can’t help but smile around you.', 'When you listen to me, I feel so heard and loved.', 'I trust you.', 'You always make me smile.', 'Can you help me fix this?', 'You always make me feel safe whenever I am around you.', 'That was so thoughtful of you to do.', 'You have such a kind heart.', 'There is something about seeing your smile that gets me every time.', 'I love how you listen to me and respect me.', 'You always seem to know exactly what to say to make me smile.', 'Can You Help Me Fix This?', 'When You Make Up Your Mind, Nothing Stands In Your Way.', 'You never fail in putting a smile on my face.', 'You always know how to make me smile.', 'You always know exactly how to turn me on.', 'You are so sexy.', 'Hearing from you just made a terrible day much better.', 'You always know exactly what to say to make me feel better.', 'You are such an amazing father.', 'You are such a great cook!', 'You know exactly how to treat a woman.', 'You are so charming that I just can’t pull myself away from you!', 'You Always Know Exactly What to Say', "You're an Incredible Father", "You're Such A Good Cook!", 'Your Outlook On Life Is Amazing.', 'Hanging Out With You Is Always A Blast.', "Whenever I'm with you, I get butterflies in my tummy.", 'You are so reliable.', 'I really appreciate a guy who’s willing to call instead of text.', 'I have butterflies in my stomach when I think of you.', 'You are such a good listener.', 'It is so nice seeing a man who can cook!', 'After watching how kind and playful you were with the kids, I know that you will be an amazing dad one day.', 'Jokes Are Funnier When You Tell Them.', 'You Are Making A Difference.', 'I love spending quality time with you.', 'There’s something about your smile that gets me every single time.', 'I love your geek side. Smart, cute, and quirky all wrapped up into one.', "I feel like I'm inside a fairy tale whenever I'm spending time with you.", 'You are so handsome.', 'It is amazing to see how hard you work!', 'I love the way that you took the lead on this.', 'I respect you more than anyone.', "It's Amazing How Hard You Work", "I Would Hang Out With You Even If You Hadn't Showered For A Couple Days.", 'I couldn’t be any more comfortable around you.', 'Everything about you is sexy.', 'You really know how to make me laugh.', 'You make me weak in the knees.']
    var rand = Math.floor(Math.random() * compliments.length)
    numspace.innerHTML = compliments[rand]

    copyToClipboard(compliments[rand])

    return false
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };