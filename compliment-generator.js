// Obtain a reference to the div element by its id
var numspace = document.getElementById('compliments');

numspace.onclick = genCompliment;

function genCompliment() {
    var compliments = ['I really appreciate a guy who’s willing to call instead of text.', 'Every morning when I wake up, I think of you and smile.', 'Hearing from you just made a terrible day much better.', 'I have butterflies in my stomach when I think of you.', 'Thank you for being such a great listener. You really know how to be there for someone.', 'You are such a good listener.', 'You always know exactly what to say to make me feel better.', 'You always make me smile.', 'I love you exactly the way you are.', 'You are the funniest guy that I have ever met.', 'You always make me feel safe whenever I am around you.', 'You always know exactly how to turn me on.', 'That was so thoughtful of you to do.', 'Your smile makes my heart melt.', 'You know exactly how to treat a woman.', 'You have such a kind heart.', 'There is something about seeing your smile that gets me every time.', 'You are so sexy.', 'You always seem to know exactly what to say to make me smile.', 'I love getting to spend my time with you.', 'I love how easy it is to talk to you. You make me feel comfortable sharing anything.', 'You always make me feel so beautiful and appreciated.', 'You Always Know Exactly What to Say', 'I Love You Just The Way You Are', 'That Was So Thoughtful', 'Your Smile Makes Me Melt', 'I Feel So Safe With You', 'I Know That You Will Always Have My Back, Because That Is The Kind Of Person You Are.', 'Jokes Are Funnier When You Tell Them.', 'I Trust You.', 'Hanging Out With You Is Always A Blast.', "I Would Hang Out With You Even If You Hadn't Showered For A Couple Days.", 'You never fail in putting a smile on my face.', 'I love spending every second of my time with you.', "I can’t help but blush around you. I actually turn beet red and it's embarrassing.", 'I love spending quality time with you.', "I feel like I'm inside a fairy tale whenever I'm spending time with you.", 'I couldn’t be any more comfortable around you.', 'I appreciate everything that you do for me.', 'You really know how to make me laugh.', 'I can’t help but smile around you.', 'You always know how to make me smile.', 'When you listen to me, I feel so heard and loved.', "Whenever I'm with you, I get butterflies in my tummy.", 'There’s something about your smile that gets me every single time.', 'I love being wrapped up in your sexy arms.', "You're the reason why I can act all foolish and romantic.", 'I’m so lucky to have someone as loving as you in my life.', 'A responsible guy like you is really hard to find.', "You're such a wonderful person. You make bad days feel not so bad.", 'You’re amazing at everything you do.', 'I always feel safe when you’re around.', "You're so reliable that I can't imagine not having you around.", 'You are such a dependable guy.', 'You are so reliable.', 'Your smile can light up the whole room.', 'You are always so good at giving the best advice.', 'I trust you.', 'Jokes are always funnier when you tell them.', 'I feel like I could talk to you for hours and hours without ever getting bored of the conversation.', 'You are a truly hardworking guy.', 'You are so brave.', 'You are so funny.', "You are an incredibly observant person. You don't miss anything important.", 'You are so cool.', 'You always make me feel so comfortable and at ease.', 'I believe in you.', 'I really appreciate everything that you do.', 'I am so lucky to have you in my life.', 'I appreciate everything that you do for me.', 'You are awesome.', 'You are amazing.', 'You make me happy.', 'I love talking to you.', 'I love that I can just be myself with you.', 'I love spending quality time with you.', 'I really enjoy our time together', 'I really enjoy our talks.', 'You are a really great person to talk to.', 'I know that I can trust you.', 'You are so smooth.', 'Being with you is fun.', 'I enjoy spending time with you.', 'You are so understanding.', 'You are such a dependable guy.', 'I trust you with all my heart.', 'I know that I can always turn to you.', 'You look really good today.', 'I really believe in you.', 'When you listen to me, I feel so heard and so loved.', 'You know exactly what to say to make me blush.', 'I love being in your arms.', 'You always make me feel so beautiful.', 'I could lay like this with you forever.', 'You make me so happy.', 'You can be so romantic.', 'I feel so safe in your arms.', 'This was the best date ever.', 'You really know how to make me feel loved.', 'You are my perfect man.', 'I love it when you wrap your arms around me.', 'I love that you listen to me.', 'I love spending time with you.', 'I love that you kiss me every day.', 'I love that you hug me for no reason.', 'I am having such a great time on this date with you.', 'That was really good (after some intimacy.)', 'I really enjoyed that what you did in bed.', 'I love how it feels when you kiss me.', 'I love feeling your arms wrapped around me.', 'I love the feeling of my hand in yours.', 'I love it when we are out somewhere and you will just reach out for my hand.', 'You are my favorite person to spend time with.', 'I feel safe when you hold me tight.', 'You have such a comforting voice.', 'You always make me feel so comfortable and at ease.', 'I love spending time with you.', 'I will always have your back, no matter what.', 'I am in love with everything you do for me.', 'I love you just the way you are.', 'You inspire me to look beyond the obvious.', 'Times spent with you are the favorite part of my life.', 'I trust you – completely.', 'I love hanging out with you – even if we are doing nothing', 'You really take care of me – thank you.', 'I love your geek side. Smart, cute, and quirky all wrapped up into one.', 'I feel so safe when you are holding me.', 'There’s just something about you that turns me on like crazy!', 'When you touch me, it’s like a jolt of electricity shoots through me.', 'You’re so caring!', 'I always feel protected when I’m with you.', 'I’m so happy to be here with you.', 'I love when you hug me.', 'I love when you hold me tight.', 'I’m so lucky to be with you.', 'You’re such a loving boyfriend/husband…']
    var rand = Math.floor(Math.random() * compliments.length)
    numspace.innerHTML = "<i>" + compliments[rand] + "</i>"

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